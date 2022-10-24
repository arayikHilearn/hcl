import { FC, useState } from 'react';
import EventsCalendar from '../components/EventsCalendar';
import { Button, Modal, Row } from 'antd';
import EventForm from '../components/EventForm';
import { useActions, useAppSelector } from '../hooks/redux';
import { IEvent } from '../models/event';

const Home: FC = () => {
    const [ modalVisible, setModalVisible ] = useState( false );
    const { createEvent } = useActions();
    const { guests, events } = useAppSelector( state => state.event );

    function createNewEvent( event: IEvent ) {
        setModalVisible( false );
        createEvent( event );
    }

    return (
        <div>
            <EventsCalendar events={ events } />
            <Row justify="center">
                <Button
                    onClick={ () => setModalVisible( true ) }
                >
                    Add event
                </Button>
            </Row>
            <Modal
                title="Add event"
                visible={ modalVisible }
                footer={ null }
                onCancel={ () => setModalVisible( false ) }
            >
                <EventForm
                    submit={ createNewEvent }
                    guests={ guests }
                />
            </Modal>
        </div>
    );
};

export default Home;
