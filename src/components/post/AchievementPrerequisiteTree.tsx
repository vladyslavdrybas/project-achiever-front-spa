import {FunctionComponent} from "react";
import {TAchievementPrerequisites} from "@/api/types";
import {
    Box,
    Link,
} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PreviewIcon from "@mui/icons-material/Preview";

interface AchievementPrerequisiteTreeProps {
    prerequisites: TAchievementPrerequisites|null;
}

const AchievementPrerequisiteTree: FunctionComponent<AchievementPrerequisiteTreeProps> = ({
    prerequisites,
}) => {
    const rows = prerequisites?.prerequisites ?? null;

    return null === rows ? (<>none</>) : (
        <TableContainer component={Box}>
            <Table aria-label="table">
                <TableHead>
                    <TableRow>
                        <TableCell>Priority</TableCell>
                        <TableCell>Achievement</TableCell>
                        <TableCell>Required</TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {rows.map((row:any) => (
                        <TableRow key={row.id}>
                            <TableCell variant="body">{row.priority}</TableCell>
                            <TableCell variant="body">
                                <Link
                                    href={'/achievement/' + row.lists[0].id + '/' + row.id}
                                >
                                    <PreviewIcon />
                                </Link>

                                {row.title}
                            </TableCell>
                            <TableCell variant="body">{row.isRequired}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default AchievementPrerequisiteTree;
