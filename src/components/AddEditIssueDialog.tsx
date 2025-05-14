
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IssueData } from '@/types/issue';

interface AddEditIssueDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  issue: IssueData | null;
  onSubmit: (issue: IssueData) => void;
}

const formSchema = z.object({
  client: z.string().min(1, { message: "Client is required" }),
  project: z.string().min(1, { message: "Project is required" }),
  clientPartner: z.string().min(1, { message: "Client Partner is required" }),
  raisedBy: z.string().min(1, { message: "Person who raised the issue is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  resolutionOwner: z.string().min(1, { message: "Resolution Owner is required" }),
  escalated: z.boolean(),
  ragStatus: z.enum(["Red", "Amber", "Green"]),
});

const AddEditIssueDialog: React.FC<AddEditIssueDialogProps> = ({
  open,
  onOpenChange,
  issue,
  onSubmit,
}) => {
  const isEditMode = !!issue;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      client: issue?.client || "",
      project: issue?.project || "",
      clientPartner: issue?.clientPartner || "",
      raisedBy: issue?.raisedBy || "",
      description: issue?.description || "",
      resolutionOwner: issue?.resolutionOwner || "",
      escalated: issue?.escalated || false,
      ragStatus: issue?.ragStatus || "Green",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    const now = new Date().toISOString();
    
    if (isEditMode && issue) {
      // Add history entry for edit
      const updatedHistory = [
        ...issue.history,
        {
          id: uuidv4(),
          timestamp: now,
          user: "Current User", // In a real app, use the logged-in user
          action: "Updated",
          details: "Issue details updated",
        },
      ];
      
      onSubmit({
        ...issue,
        ...values,
        history: updatedHistory,
      });
    } else {
      // Create new issue
      const newIssue: IssueData = {
        id: uuidv4(),
        ...values,
        dateCreated: now.split("T")[0],
        dateResolved: null,
        history: [
          {
            id: uuidv4(),
            timestamp: now,
            user: "Current User", // In a real app, use the logged-in user
            action: "Created",
            details: `Issue created and assigned to ${values.resolutionOwner}`,
          },
        ],
      };
      
      onSubmit(newIssue);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Issue" : "Add New Issue"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="client"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client</FormLabel>
                    <FormControl>
                      <Input placeholder="Client name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="project"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project</FormLabel>
                    <FormControl>
                      <Input placeholder="Project name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="clientPartner"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Partner</FormLabel>
                    <FormControl>
                      <Input placeholder="Client Partner" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="raisedBy"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Raised By</FormLabel>
                    <FormControl>
                      <Input placeholder="Person who raised this issue" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the issue"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="resolutionOwner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resolution Owner</FormLabel>
                  <FormControl>
                    <Input placeholder="Person responsible for resolution" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="escalated"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Escalated</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(value === "true")}
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Is this issue escalated?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Yes</SelectItem>
                        <SelectItem value="false">No</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ragStatus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RAG Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select RAG status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Red">Red</SelectItem>
                        <SelectItem value="Amber">Amber</SelectItem>
                        <SelectItem value="Green">Green</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Save Changes" : "Add Issue"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditIssueDialog;
