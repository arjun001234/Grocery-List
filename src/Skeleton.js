import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

export default function AnimationPage() {
      return (
        <div style={{display: "flex", flexDirection: "column",justifyContent: "center", alignItems: "center",position: "relative" ,top: "50px"}}>
            <Typography variant="h4">Loading...</Typography>
            <Skeleton variant="text" width="40%" />
        <Skeleton variant="rect"  height={150} width="40%"  />
        <Skeleton variant="text" width="40%"  />
        <Skeleton variant="text" width="30%" style={{position: "relative", right: "5%"}} />
        <Skeleton variant="text" width="20%" style={{position: "relative", right: "10%"}} />
      </div>
      )
}