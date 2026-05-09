import { getStatusConfig } from '../../utils/helpers';

const StatusBadge = ({ status }) => {
    const config = getStatusConfig(status);
    return (
        <span className={`badge ${config.color} gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
            {config.label}
        </span>
    );
};

export default StatusBadge;