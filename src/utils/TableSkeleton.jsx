/* eslint-disable */
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Skeleton } from "@mui/material";

const TableSkeleton = ({ rows = 5, columns = 4 }) => {
    return (
        // <Table>
        //     <TableHead>
        //         <TableRow>
        //             {[...Array(columns)].map((_, index) => (
        //                 <TableCell key={index}>
        //                     <Skeleton variant="text" width="80%" />
        //                 </TableCell>
        //             ))}
        //         </TableRow>
        //     </TableHead>
        //     <TableBody>
        //         {[...Array(rows)].map((_, rowIndex) => (
        //             <TableRow key={rowIndex}>
        //                 {[...Array(columns)].map((_, colIndex) => (
        //                     <TableCell key={colIndex}>
        //                         <Skeleton variant="text" width="100%" />
        //                     </TableCell>
        //                 ))}
        //             </TableRow>
        //         ))}
        //     </TableBody>
        // </Table>
        <>
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                    {Array.from({ length: columns }).map((_, colIndex) => (
                        <TableCell key={colIndex}>
                            <Skeleton variant="text" width="100%" />
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </>
    );
};

export default TableSkeleton;
