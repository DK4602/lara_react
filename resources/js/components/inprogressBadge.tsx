import { Badge } from "./ui/badge";
type Props = {
    data : string
}
function InprogressBadge({data}: Props) {
    return (
        <Badge className="mt-2 w-28 bg-amber-400 py-1">
            {data}
        </Badge>
    );
}

export default InprogressBadge;
