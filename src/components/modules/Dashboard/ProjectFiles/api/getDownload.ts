export const downloadFile = async (fileId: number): Promise<Blob> => {
  const token = localStorage.getItem("auth_token");

  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/files/${fileId}/download`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to download file");
  }

  return await response.blob();
};
