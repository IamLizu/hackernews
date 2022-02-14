import React from "react";
import { useNavigate } from "react-router-dom";
import { NewsArrayType, NewsType } from "../../types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function NewsBlock({ newsArray }: { newsArray: NewsArrayType }) {
  const navigate = useNavigate();

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">URL</TableCell>
              <TableCell align="right">Created At</TableCell>
              <TableCell align="right">Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsArray.map((news: NewsType, index: number) => (
              <TableRow
                key={news.created_at_i + index}
                onClick={() => {
                  navigate("/news/" + news.created_at_i);
                }}
                style={{ cursor: "pointer" }}
              >
                <TableCell component="th" scope="row">
                  {news.title}
                </TableCell>
                <TableCell align="right">{news.url}</TableCell>
                <TableCell align="right">{news.created_at}</TableCell>
                <TableCell align="right">{news.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
