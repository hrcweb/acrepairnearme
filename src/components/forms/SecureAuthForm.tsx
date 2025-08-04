
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { validatePasswordStrength, rateLimiter } from '@/utils/security';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { z } from 'zod';

const authSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().optional(),
  fullName: z.string().min(2, 'Full name must be at least 2 characters').optional(),
}).refine((data) => {
  if (data.confirmPassword !== undefined) {
    return data.password === data.confirmPassword;
  }
  return true;
}, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type AuthFormData = z.infer<typeof authSchema>;

interface SecureAuthFormProps {
  isSignUp: boolean;
  onToggleMode: () => void;
}

const SecureAuthForm = ({ isSignUp, onToggleMode }: SecureAuthFormProps) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<{ isValid: boolean; errors: string[] }>({ isValid: false, errors: [] });
  const { toast } = useToast();
  const { signIn, signUp } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const watchPassword = watch('password');

  React.useEffect(() => {
    if (watchPassword && isSignUp) {
      setPasswordStrength(validatePasswordStrength(watchPassword));
    }
  }, [watchPassword, isSignUp]);

  const onSubmit = async (data: AuthFormData) => {
    // Rate limiting
    const rateLimitKey = `auth_${data.email}`;
    if (!rateLimiter.isAllowed(rateLimitKey, 5, 900000)) { // 5 attempts per 15 minutes
      toast({
        title: "Too many attempts",
        description: "Please wait before trying again",
        variant: "destructive",
      });
      return;
    }

    if (isSignUp && !passwordStrength.isValid) {
      toast({
        title: "Password too weak",
        description: "Please use a stronger password",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await signUp(data.email, data.password, data.fullName);
        if (!error) {
          toast({
            title: "Account created!",
            description: "Please check your email to verify your account",
          });
        }
      } else {
        const { error } = await signIn(data.email, data.password);
        if (!error) {
          toast({
            title: "Welcome back!",
            description: "You have successfully signed in",
          });
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          {isSignUp ? 'Create Account' : 'Sign In'}
        </CardTitle>
        <CardDescription>
          {isSignUp 
            ? 'Create a secure account to get started'
            : 'Sign in to your account'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                {...register('fullName')}
                placeholder="John Doe"
                maxLength={50}
              />
              {errors.fullName && (
                <p className="text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              placeholder="john@example.com"
              maxLength={100}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                {...register('password')}
                placeholder="••••••••"
                maxLength={128}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
            
            {isSignUp && watchPassword && (
              <div className="space-y-1">
                <div className={`text-xs ${passwordStrength.isValid ? 'text-green-600' : 'text-red-600'}`}>
                  Password strength: {passwordStrength.isValid ? 'Strong' : 'Weak'}
                </div>
                {!passwordStrength.isValid && (
                  <ul className="text-xs text-red-600 list-disc list-inside">
                    {passwordStrength.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  placeholder="••••••••"
                  maxLength={128}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-600">{errors.confirmPassword.message}</p>
              )}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Processing..." : (isSignUp ? "Create Account" : "Sign In")}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isSignUp ? "Already have an account?" : "Don't have an account?"}
            <button
              type="button"
              onClick={onToggleMode}
              className="ml-1 text-blue-600 hover:underline font-medium"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecureAuthForm;
