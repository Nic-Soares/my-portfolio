import styles from './ServiceCard.module.css';

type ServiceItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  // className prop is removed as internal styles are handled by the module
};

const ServiceItem: React.FC<ServiceItemProps> = ({ icon, title, description }) => {
  return (
    <>
      <div className={styles['service-item__icon']}>{icon}</div>
      <h3 className={styles['service-item__title']}>{title}</h3>
      <p className={styles['service-item__description']}>{description}</p>
    </>
  );
};


export default ServiceItem;
