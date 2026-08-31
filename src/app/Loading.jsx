const Loading = () => {
    return (
        <div className="flex min-h-[300px] w-full items-center justify-center">
            <div className="relative h-12 w-12">
                <div className="absolute inset-0 rounded-full border-4 border-default-200" />

                <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-primary" />
            </div>
        </div>
    );
};