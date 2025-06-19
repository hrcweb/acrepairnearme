
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { FileText, Plus, Edit, Trash2, Eye, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ContentItem {
  id: string;
  title: string;
  content: string;
  type: 'page' | 'faq' | 'announcement' | 'policy';
  status: 'draft' | 'published' | 'archived';
  created_at: string;
  updated_at: string;
}

const AdminContentManager = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [newContent, setNewContent] = useState({
    title: "",
    content: "",
    type: "page" as ContentItem['type'],
    status: "draft" as ContentItem['status']
  });

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      // This would load from a content management table
      // For now, we'll simulate with static data
      const mockContent: ContentItem[] = [
        {
          id: '1',
          title: 'About Us',
          content: 'Our company story and mission...',
          type: 'page',
          status: 'published',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'How do I find the best AC repair service?',
          content: 'Look for licensed contractors with good reviews...',
          type: 'faq',
          status: 'published',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Site Maintenance Notice',
          content: 'We will be performing maintenance on...',
          type: 'announcement',
          status: 'draft',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
      setContent(mockContent);
    } catch (error) {
      console.error('Error loading content:', error);
      toast({
        title: "Error loading content",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async () => {
    setLoading(true);
    try {
      if (editingContent) {
        // Update existing content
        const updatedContent = {
          ...editingContent,
          updated_at: new Date().toISOString()
        };
        
        setContent(prev => prev.map(item => 
          item.id === editingContent.id ? updatedContent : item
        ));
        
        toast({
          title: "Content updated",
          description: `"${editingContent.title}" has been updated successfully.`,
        });
      } else {
        // Create new content
        const contentItem: ContentItem = {
          id: Date.now().toString(),
          ...newContent,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        setContent(prev => [contentItem, ...prev]);
        
        toast({
          title: "Content created",
          description: `"${newContent.title}" has been created successfully.`,
        });
        
        setNewContent({
          title: "",
          content: "",
          type: "page",
          status: "draft"
        });
      }
      
      setEditingContent(null);
    } catch (error) {
      toast({
        title: "Error saving content",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContent = async (id: string) => {
    if (!confirm("Are you sure you want to delete this content?")) {
      return;
    }

    try {
      setContent(prev => prev.filter(item => item.id !== id));
      toast({
        title: "Content deleted",
        description: "Content has been deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error deleting content",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  const filteredContent = content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || item.type === filterType;
    const matchesStatus = filterStatus === "all" || item.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'page': return 'bg-blue-100 text-blue-800';
      case 'faq': return 'bg-purple-100 text-purple-800';
      case 'announcement': return 'bg-orange-100 text-orange-800';
      case 'policy': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Content Creation/Editing Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {editingContent ? "Edit Content" : "Create New Content"}
          </CardTitle>
          <CardDescription>
            {editingContent ? "Update existing content" : "Add new content to your site"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={editingContent ? editingContent.title : newContent.title}
                onChange={(e) => {
                  if (editingContent) {
                    setEditingContent({ ...editingContent, title: e.target.value });
                  } else {
                    setNewContent({ ...newContent, title: e.target.value });
                  }
                }}
                placeholder="Enter content title"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="type">Type</Label>
                <Select
                  value={editingContent ? editingContent.type : newContent.type}
                  onValueChange={(value: ContentItem['type']) => {
                    if (editingContent) {
                      setEditingContent({ ...editingContent, type: value });
                    } else {
                      setNewContent({ ...newContent, type: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="page">Page</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="policy">Policy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={editingContent ? editingContent.status : newContent.status}
                  onValueChange={(value: ContentItem['status']) => {
                    if (editingContent) {
                      setEditingContent({ ...editingContent, status: value });
                    } else {
                      setNewContent({ ...newContent, status: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={editingContent ? editingContent.content : newContent.content}
              onChange={(e) => {
                if (editingContent) {
                  setEditingContent({ ...editingContent, content: e.target.value });
                } else {
                  setNewContent({ ...newContent, content: e.target.value });
                }
              }}
              placeholder="Enter your content here..."
              rows={8}
            />
          </div>
          
          <div className="flex gap-2">
            <Button onClick={handleSaveContent} disabled={loading}>
              {loading ? "Saving..." : editingContent ? "Update Content" : "Create Content"}
            </Button>
            {editingContent && (
              <Button variant="outline" onClick={() => setEditingContent(null)}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Content List */}
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>
            Manage all your site content from one place
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="page">Pages</SelectItem>
                <SelectItem value="faq">FAQs</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="policy">Policies</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Content Items */}
          <div className="space-y-4">
            {filteredContent.map(item => (
              <div key={item.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{item.title}</h3>
                      <Badge className={getTypeColor(item.type)}>
                        {item.type}
                      </Badge>
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.content.substring(0, 150)}
                      {item.content.length > 150 && "..."}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(item.created_at).toLocaleDateString()}
                      {item.updated_at !== item.created_at && (
                        <> • Updated: {new Date(item.updated_at).toLocaleDateString()}</>
                      )}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingContent(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteContent(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {filteredContent.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                {searchTerm || filterType !== "all" || filterStatus !== "all" 
                  ? "No content matches your filters"
                  : "No content found. Create your first piece of content above."
                }
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminContentManager;
