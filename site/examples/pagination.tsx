import { useState } from "react";
import { Pagination } from "daybreaker";

export const Example = () => {
  const [page, setPage] = useState(4);

  return <Pagination page={page} count={12} onPageChange={setPage} />;
};
