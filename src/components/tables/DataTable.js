import {
  Table,
  Button,
  Badge,
  Form,
  InputGroup,
  Dropdown,
} from "react-bootstrap";

export default function DataTable({
  columns,
  data,
  keyField = "id",
  onEdit,
  onDelete,
  onView,
  searchable = true,
  actions = true,
}) {
  return (
    <div className="data-table">
      {searchable && (
        <div className="table-toolbar mb-3">
          <InputGroup style={{ maxWidth: "300px" }}>
            <Form.Control placeholder="Search..." />
            <Button variant="outline-secondary">Search</Button>
          </InputGroup>
        </div>
      )}

      <div className="table-responsive">
        <Table hover>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.key}>{column.label}</th>
              ))}
              {actions && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row[keyField]}>
                {columns.map((column) => (
                  <td key={column.key}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-primary" size="sm">
                        Actions
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {onView && (
                          <Dropdown.Item onClick={() => onView(row)}>
                            View
                          </Dropdown.Item>
                        )}
                        {onEdit && (
                          <Dropdown.Item onClick={() => onEdit(row)}>
                            Edit
                          </Dropdown.Item>
                        )}
                        {onDelete && (
                          <Dropdown.Item
                            onClick={() => onDelete(row)}
                            className="text-danger"
                          >
                            Delete
                          </Dropdown.Item>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
