import { IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import "./Issue.scss";

interface MyProps {
  title: string;
  priority: string;
  link: string;
}

const Issue = (props: MyProps) => {
  const { title, priority, link } = props;

  return (
    <a className="Issue" href={link}>
      <div className="Issue__info">
        <div className="Issue__info_title">{title}</div>
        <div className="Issue__info_priority">{priority}</div>
      </div>
      <IconButton>
        <EditIcon />
      </IconButton>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </a>
  );
};

export default Issue;
