export interface ProjectFile {
  id: number;
  name: string;
  file_path: string;
  file_size: number;
  file_size_formatted: string;
  mime_type: string;
  url: string;
  project_id: number;
  task_id: number | null;
  uploaded_by: string;
  uploaded_by_id: number;
  project: {
    id: number;
    name: string;
  };
  task: null;
  uploader: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

export interface FilesPagination {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number;
  to: number | null;
  total: number;
}

export interface FilesResponse {
  success: boolean;
  message: string;
  data: {
    data: ProjectFile[];
    links: {
      first: string;
      last: string;
      prev: string | null;
      next: string | null;
    };
    meta: FilesPagination;
  };
}

export interface UploadFilePayload {
  name: string;
  project_id: number;
  file: File;
}



export interface DeleteModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  file: ProjectFile | null;
  onConfirm: () => void;
  isPending: boolean;
}


export interface FileCardProps {
  file: ProjectFile;
  onDelete: (fileId: number) => void;
}

// pages

export interface AllFileProps {
  files: ProjectFile[];
  projectId: string;
}
export interface FileCardProps {
  file: ProjectFile;
}

export interface FileCardItemProps {
  file: ProjectFile;
}

export interface RecentFileProps {
  files: ProjectFile[];
}