
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const BreadcrumbNavigation = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbItems = (): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

    // Map common routes to user-friendly names
    const routeMap: Record<string, string> = {
      'list-business': 'List Your Business',
      'success-stories': 'Success Stories',
      'emergency': 'Emergency Service',
      'faq': 'FAQ',
      'back-office': 'Back Office',
      'contact-support': 'Contact Support',
      'privacy-policy': 'Privacy Policy',
      'terms-of-service': 'Terms of Service',
      'contractor-guidelines': 'Contractor Guidelines',
      'business': 'Business',
      'auth': 'Sign In',
      'admin': 'Admin',
      'payment-success': 'Payment Success'
    };

    let currentPath = '';
    pathnames.forEach((segment, index) => {
      currentPath += `/${segment}`;
      const isLast = index === pathnames.length - 1;
      const label = routeMap[segment] || segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      items.push({
        label,
        href: isLast ? undefined : currentPath
      });
    });

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Don't show breadcrumbs on home page
  if (location.pathname === '/') {
    return null;
  }

  // Generate structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": item.href ? `https://acrepairnearme.pro${item.href}` : undefined
    }))
  };

  return (
    <>
      {/* Structured data for Google */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Visible breadcrumb navigation */}
      <nav aria-label="Breadcrumbs" className="container mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={index}>
                <BreadcrumbItem>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <Link to={item.href} className="flex items-center">
                        {index === 0 && <Home className="h-4 w-4 mr-1" />}
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </nav>
    </>
  );
};

export default BreadcrumbNavigation;
