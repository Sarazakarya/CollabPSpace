import Swal from "sweetalert2";

export function useAlert() {
  const showAlert = (icon: "success" | "error", title: string) => {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      background: "#ffffff",
      color: "#334155",
      customClass: {
        popup: "gather-toast",
        title: "gather-toast-title",
        timerProgressBar: "gather-toast-progress",
      },
    });
  };

  return { showAlert };
}
