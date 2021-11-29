import { Container } from '../components/Container';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { DarkModeSwitch } from '../components/DarkModeSwitch';
import { Button } from '@chakra-ui/button';

interface apiResponse {
    title: string;
    description: string;
}

// http://myapi/graphql?query={me{name}}

const apiKey = process.env.REACT_APP_GIPHER_API_KEY;

const Index = () => {
    const getAllGifs = async () => {
        await fetch(`http://api.giphy.com/v1/gifs/trending?api_key=2bdn2aQsC4hMxrKn5kul22j7jHNzCEsN`, {
            method: 'GET',
        })
            .then(async (res) => {
                const result = await res.json();
                setAllGifs(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
        return true;
    };

    const getGifsById = async (idsArray: string[]) => {
        let idsString = '';

        idsArray.forEach((id, i) => {
            if (i === idsArray.length - 1) {
                idsString += id;
            } else {
                idsString += `${id},`;
            }
        });

        await fetch(`http://api.giphy.com/v1/gifs?api_key=2bdn2aQsC4hMxrKn5kul22j7jHNzCEsN&ids=${idsString}`, {
            method: 'GET',
        }).then(async (res) => {
            const gifsById = await res.json();
            console.log('gifsById:', gifsById);
        });
    };

    const [allGifs, setAllGifs] = useState<any[]>([]);

    useEffect(() => {
        getAllGifs();
        getGifsById(['mRwn5Rw66qzvtdWiOF', 'dAfieBBpL9nBqmNsXn']);
    }, []);

    console.log(allGifs);

    return (
        <Container height="100vh">
            <div>Hello world</div>
            {allGifs.map((gif) => {
                return (
                    <div>
                        <h1 key={gif.id}>{gif.title}</h1>
                        <img src={gif.images.fixed_height_small.url} alt="" />
                    </div>
                );
            })}
            <DarkModeSwitch />
            <Button colorScheme="blue" variant="solid">
                Something
            </Button>
        </Container>
    );
};

export default Index;
