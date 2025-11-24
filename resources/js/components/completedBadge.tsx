import { Badge } from "./ui/badge";
type Props = {
    data:string
};
function CompletedBadge({data}: Props) {
    return (
        <Badge className="mt-2 w-28 bg-green-600 py-1">
            {data}
        </Badge>
    );
}

export default CompletedBadge;
