import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    thin?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, thin = false }) => {
    return (
        <div className={`${styles.container} ${thin ? styles.thin : ''}`}>
            {children}
        </div>
    );
}

export default Container;
