import { Pagination } from "daybreaker";
import { useState } from "react";

export const Example = () => {
  const [page, setPage] = useState(4);

  return <Pagination page={page} count={12} onPageChange={setPage} />;
};
