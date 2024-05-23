import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import {Search} from '@/components/search.jsx'

import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from '../ui/table.jsx'
import {useEffect, useState} from 'react'
import {Input} from '../ui/input.jsx'

import {DataTableViewOptions} from './DataTableViewOptions.jsx'
import {DataTablePagination} from './DataTablePagination.jsx'
// import {topNav} from "../../../pages/Dahsboard/index.jsx";
import {UserNav} from "../user-nav.jsx";
import {Add} from "@/components/data-table/components/Add.jsx";
import {LayoutHeader} from "@/components/custom/layout.jsx";



export function DataTable({setSelectedRows = ()=>{},columns, data, filterBy, messageFilter, addAction,actionName ,name , showHead = true}) {


  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})
    const [open, setOpen] = useState(false);
    const [rowSelection, setRowSelection] = useState({})



    const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
        rowSelection,
    },
  })

    console.log('all columns ' ,table.getAllColumns())
    useEffect(() => {
        setSelectedRows(table.getSelectedRowModel().rows)
    }, []);
  return (
    <>

            <LayoutHeader>
            {/*<TopNav links={topNav} />*/}
            <div className="ml-auto flex items-center space-x-4">
                {/* eslint-disable-next-line react/jsx-no-undef */}
                <Search />
                <UserNav />
            </div>
        </LayoutHeader>
      <div className="flex items-center py-4">
        <Input
          placeholder={messageFilter}
          value={table.getColumn(filterBy)?.getFilterValue() ?? ''}
          onChange={(event) =>
            table.getColumn(filterBy)?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
          <div className={'flex justify-end items-end w-full'}>
              {addAction &&
                  <Add open={open} setOpen={setOpen} addAction={addAction} name={name} actionName={actionName}/>
              }

              <DataTableViewOptions table={table}/>
          </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </>
  )
}
