import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import { useEffect, useState } from "react";
import { useColorScheme } from "@mui/joy";

export default function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Select
      value={mode}
      onChange={(_, newMode) => {
        setMode(newMode);
      }}
      sx={{ width: "max-content" }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}
