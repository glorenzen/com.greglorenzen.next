import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    wide?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, wide = false }) => {
    return (
        <div className={`${styles.container} ${wide ? styles.wide : ''}`}>
            {children}
        </div>
    );
}

export default Container;
