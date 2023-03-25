import axios from 'axios';

import { useState, useEffect } from 'react';
import { Link as NavLink, useNavigate, useLocation } from 'react-router-dom';

import {
  Pagination,
  PaginationItem,
  TextField,
  Stack,
  Link,
} from '@mui/material';

const BASE_URL = 'https://hn.algolia.com/api/v1/search?';

const HomePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('react');
  const [page, setPage] = useState(
    parseInt(location.search?.split('=')[1] || 1)
  );
  const [pageTotal, setPageTotal] = useState(0);

  useEffect(() => {
    axios.get(BASE_URL + `query=${query}&page=${page - 1}`).then((response) => {
      const { data } = response;

      setPosts(data.hits);
      setPageTotal(data.nbPages);

      if (data.nbPages < page) {
        setPage(1);
        navigate('/?page=1', { replace: true });
      }
    });
  }, [query, page]);

  return (
    <>
      <TextField
        fullWidth
        label='query'
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <Stack spacing={2}>
        {!!pageTotal && (
          <Pagination
            sx={{ marginX: 'auto', marginY: 3 }}
            showFirstButton
            showLastButton
            count={pageTotal}
            page={page}
            onChange={(_, pageNumber) => setPage(pageNumber)}
            renderItem={(item) => (
              <PaginationItem
                component={NavLink}
                to={`/?page=${item.page}`}
                {...item}
              />
            )}
          />
        )}
        {posts.map((post) => (
          <Link key={post.objectID} href={post.url}>
            {post.title || post.story_title}
          </Link>
        ))}
      </Stack>
    </>
  );
};

export default HomePage;
