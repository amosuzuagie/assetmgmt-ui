type Props = {
    status: string;
}

export const AssetStatusBadge = ({ status }: Props) => {
    const styles: Record<string, string> = {
        IN_STORE: "bg-blue-100 text-blue-700",
        ASSIGNED: "bg-green-100 text-green-700",
        DISPOSED: "bg-red-100 text-red-700",
    }

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            styles[status] ?? "bg-gray-100 text-gray-700"
        }`}>
            {status}
        </span>
    );
}