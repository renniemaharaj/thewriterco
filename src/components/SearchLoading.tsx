type SeachLoadingProps = {
  isLoading: boolean;
};
const SearchLoading: React.FC<SeachLoadingProps> = ({ isLoading }) => {
  return (
    // <div className="flex items-center justify-center h-screen">

    isLoading && (
      <div className="flex items-center justify-center relative">
        <div className="h-5 w-5 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  );
};

export default SearchLoading;
