import {
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";

import { Employee } from "../types/types";
import { useEffect, useState } from "react";

let init = false;
export function Root() {
  const [employees, setEmployees] = useState<Array<Employee>>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch("http://localhost:5173/employees");
      const data = (await response.json()) as { employees: Array<Employee> };
      setEmployees(data.employees);
    };
    if (!init) {
      void fetchEmployees();
      init = true;
    }
  }, [employees, setEmployees]);

  const drawerWidth = 240;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Typography variant="h5" noWrap>
          Employees
        </Typography>
        {employees.length > 0 ? (
          <List>
            {employees.map((employee) => (
              <ListItem key={employee.id} disablePadding>
                <ListItemText primary={employee.fullName} />
              </ListItem>
            ))}
          </List>
        ) : (
          <p>
            <i>No Employees loaded</i>
          </p>
        )}
      </Drawer>
    </Box>
  );
}
