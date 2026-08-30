"use client";

import { deleteSchedule } from "@/lib/api/doctors/action";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const DeleteSchedule = ({ doctorId }) => {
    const router = useRouter();

    const handleDelete = async () => {
        try {
            const result = await deleteSchedule(doctorId);

            console.log("Delete result:", result);

            if (result?.success) {
                toast.success("Schedule deleted successfully");

                router.push("/dashboard/doctor/schedule");
                router.refresh();
                 window.location.href = "/dashboard/doctor/schedule";
            } else {
                toast.error("Failed to delete schedule");
            }
        } catch (error) {
            toast.error("Something went wrong");
        }
    };

    return (
        <div>
            <AlertDialog>
                <Button variant="outline">
                    Delete Schedule
                </Button>

                <AlertDialog.Backdrop>
                    <AlertDialog.Container>
                        <AlertDialog.Dialog className="sm:max-w-[400px]">
                            <AlertDialog.CloseTrigger />

                            <AlertDialog.Header>
                                <AlertDialog.Icon status="danger" />

                                <AlertDialog.Heading>
                                    Delete schedule permanently?
                                </AlertDialog.Heading>
                            </AlertDialog.Header>

                            <AlertDialog.Body>
                                <p>
                                    This will permanently delete this
                                    Schedule and all of its data.
                                    This action cannot be undone.
                                </p>
                            </AlertDialog.Body>

                            <AlertDialog.Footer>
                                <Button
                                    slot="close"
                                    variant="tertiary"
                                >
                                    Cancel
                                </Button>

                                <Button
                                    onClick={handleDelete}
                                    slot="close"
                                    variant="danger"
                                >
                                    Confirm Delete
                                </Button>
                            </AlertDialog.Footer>
                        </AlertDialog.Dialog>
                    </AlertDialog.Container>
                </AlertDialog.Backdrop>
            </AlertDialog>
        </div>
    );
};

export default DeleteSchedule;