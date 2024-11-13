export type ErrorProps = {
    errorMessage?: string | null;
};

export const Error = ({ errorMessage }: ErrorProps) => {
    if (!errorMessage) return null;

    return (
        <div
            role="alert"
            aria-label={errorMessage}
            className="text-red-500 text-sm font-semibold"
        >
            {errorMessage}
        </div>
    );
}