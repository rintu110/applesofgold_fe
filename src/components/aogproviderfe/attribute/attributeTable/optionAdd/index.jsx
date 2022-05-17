import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "components/UI/Button";
import TextField from "components/UI/TextField";
import Checkbox from "@mui/material/Checkbox";

function OptionAdd({ option, setOption, title, button, onSubmit }) {
  return (
    <Dialog open={option.open} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            label="Prompt"
            fullWidth
            value={option.prompt}
            onChange={(event) =>
              setOption({ ...option, prompt: event.target.value })
            }
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            label="Code"
            fullWidth
            value={option.code}
            onChange={(event) =>
              setOption({ ...option, code: event.target.value })
            }
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <TextField
            variant="outlined"
            color="secondary"
            size="small"
            label="Price"
            fullWidth
            value={option.price}
            onChange={(event) =>
              setOption({ ...option, price: event.target.value })
            }
          />
        </Box>
        <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
          <Typography sx={{ mr: 1 }}>Default :</Typography>
          <Box sx={{ ml: 1 }}>
            <Checkbox
              color="success"
              checked={option.default}
              onChange={(event) => {
                setOption({
                  ...option,
                  default: event.target.checked,
                  attrOptions: option.attrOptions.map((item) => ({
                    ...item,
                    defaults: false,
                  })),
                });
              }}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          color="secondary"
          size="small"
          variant="outlined"
          onClick={() =>
            setOption({
              ...option,
              prompt: "",
              code: "",
              default: false,
              price: "",
              attributeId: "",
              open: false,
            })
          }
        >
          CANCEL
        </Button>
        <Button
          color="secondary"
          size="small"
          variant="contained"
          onClick={onSubmit}
        >
          {button}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default OptionAdd;
