import { useRef, useState,useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import Dataanime from "../../assets/anime.json"
import './index.scss'
import { pink } from '@mui/material/colors';
import AdminAddAnimeModal from '../AdminAddAnimeModal';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'anime',
    numeric: false,
    disablePadding: true,
    label: 'Anime',
  },
  {
    id: 'studio',
    numeric: true,
    disablePadding: false,
    label: 'Studio',
  },
  {
    id: 'score',
    numeric: true,
    disablePadding: false,
    label: 'Score',
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
  },
  {
    id: 'season',
    numeric: true,
    disablePadding: false,
    label: 'Season',
  },
  {
    id: 'type',
    numeric: true,
    disablePadding: false,
    label: 'Type',
  },
  {
    id: 'manage',
    numeric: true,
    disablePadding: false,
    label: 'Manage',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead sx={{backgroundColor: pink[400]}}>
      <TableRow>
        <TableCell padding="checkbox">
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sx={{
              color:'white'
            }}
          >
           {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};
export default function AdminTableAnime() {
  
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Dataanime.length) : 0;
    const [modalAnime,setModalAnime]=useState()
    const [modalMode,setModalMode]=useState('')
    const [open, setOpen] = useState(false);
    const handleOpen = (item,mode) => {
        setModalMode(mode);
        if(mode=="edit"){
            setModalAnime(item)
        }
        setOpen(true);
    }
    const handleClose = () =>setOpen(false);
  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {Dataanime
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => { 
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.name}
                    >
                      <TableCell padding="checkbox">
                    
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.studios}</TableCell>
                      <TableCell align="left">{row.score}</TableCell>
                      <TableCell align="left">{row.year}</TableCell>
                      <TableCell align="left">{row.seasonal}</TableCell>
                      <TableCell align="left">{row.seasonal?'TV':'Movie'}</TableCell>
                      <TableCell align="left"><button className='adminTable-detail-button' onClick={()=>handleOpen(row,"edit")}>Detail</button></TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5 ,10, 25, 50]}
          component="div"
          count={Dataanime.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <AdminAddAnimeModal open={open} onClose={handleClose} anime={modalAnime} mode={modalMode}/>
    </Box>
  );
}