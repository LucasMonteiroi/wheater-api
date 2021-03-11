import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { usePosition } from 'use-position';
import api from '../../services/api';

import { Title, Form, Wheaters, Error } from './styles';

interface Wheater {
    number: number;
    name: string;
    temperature: number;
    temperatureUnit: string;
    icon: string;
    shortForecast: string;
    detailedForecast: string;
}

const Dashboard: React.FC = () => {
    const [newWheater, setNewWheater] = useState('');
    const [wheaters, setWheaters] = useState<Wheater[]>([]);
    const [responseError, setResponseError] = useState('');
    const { latitude, longitude } = usePosition(true);
    useEffect(() => {
        setNewWheater(`${latitude},${longitude}`);
    }, []);

    async function handleAddWheater(
        event: FormEvent<HTMLFormElement>,
    ): Promise<void> {
        try {
            event.preventDefault();
            const response = await api.get(`${latitude},${longitude}/forecast`);

            const wheater = response.data.properties.periods;
            setWheaters(wheater);
            setResponseError('');
        } catch (err) {
            console.log(err);
            setResponseError('Wheater API is not available on your position!');
        }
    }

    return (
        <>
            <Title>Wheater App</Title>
            <Form hasError={!!responseError} onSubmit={handleAddWheater}>
                <input
                    disabled
                    value={newWheater}
                    placeholder="Insert the address or lat, long"
                />
                <button type="submit">Search</button>
            </Form>
            {responseError && <Error>{responseError}</Error>}
            <Wheaters>
                {wheaters.map((wheater) => (
                    <a key={wheater.number} href="/">
                        <img src={wheater.icon} alt="" />
                        <p>
                            {wheater.temperature} {wheater.temperatureUnit}
                        </p>
                        <div>
                            <b>{wheater.name}: </b>
                            <strong> {wheater.shortForecast}</strong>
                            <p>{wheater.detailedForecast}</p>
                        </div>
                        <FiChevronRight size={20} />
                    </a>
                ))}
            </Wheaters>
        </>
    );
};

export default Dashboard;
