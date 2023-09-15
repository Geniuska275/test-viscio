import React from "react";
import { Buttons } from "../Utils";

const LoadMore = ({ handleLoadMore, next, loading }) => {
	return (
		<>
			{!next ? (
				""
			) : (
				<Buttons
					onClick={handleLoadMore}
					title="load more"
					css={"btn btn-primary1 text-uppercase py-3 my-4 mx-auto"}
					width="w-50"
					loading={loading}
				/>
			)}
		</>
	);
};

export default LoadMore;
