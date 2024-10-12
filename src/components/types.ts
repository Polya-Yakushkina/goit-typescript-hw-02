export interface Image {
    id: string;
    alt_description: string;
    description?: string;
    likes: number;
    user?: {
        name: string;
    }
    urls: {
        small: string;
        regular: string;
    }
}

export interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImage: Image | null;
}

export interface ApiResponse {
    total_pages: number;
    results: [];
}