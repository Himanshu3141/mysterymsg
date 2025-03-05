import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog";
  import { Button } from "./ui/button";
  import { X } from "lucide-react";
  import { Message } from "@/model/User";
  import { toast } from "sonner";
  import axios, { AxiosError } from "axios";
  import { ApiResponse } from "@/types/ApiResponse";
  
  type MessagecardProps = {
    message: Message;
    onMessageDelete: (messageId: string) => void;
  };
  
  function Messagecard({ message, onMessageDelete }: MessagecardProps) {
    const handleDeleteConfirm = async () => {
      try {
        const response = await axios.delete<ApiResponse>(
          `/api/delete-message/${message._id}`
        );
        
        toast.success(response.data.message);
        onMessageDelete(message._id as string);
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(
          axiosError.response?.data.message ?? "Failed to delete message"
        );
      }
    };
  
    return (
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <X className="w-5 h-5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  message.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteConfirm}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
  
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
      </Card>
    );
  }
  
  export default Messagecard;
  