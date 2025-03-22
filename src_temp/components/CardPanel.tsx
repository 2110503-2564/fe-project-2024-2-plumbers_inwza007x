"use client";

import {useReducer} from "react";
import Card from "./Card";
import Link from "next/link";

const initialState = new Map([
    ["The Bloom Pavilion", 0],
    ["Spark Space", 0],
    ["The Grand Table", 0]
]);

function ratingReducer(state: Map<string, number>, action: {type: string; venue: string; rating?: number}) {
    const newState = new Map(state);
    
    if (action.type === "update") {
        newState.set(action.venue, action.rating ?? 0);
    } 
    else if (action.type === "toggle") {
        if (newState.has(action.venue)) {
            newState.delete(action.venue);
        } 
        else {
            newState.set(action.venue, action.rating ?? 0);
        }
    }
    return newState;
}

export default function CardPanel() {
    const [ratings, dispatch] = useReducer(ratingReducer, initialState);

    const venueList = [
        {vid: "001", name: "The Bloom Pavilion", image: "/img/bloom.jpg"},
        {vid: "002", name: "Spark Space", image: "/img/sparkspace.jpg"},
        {vid: "003", name: "The Grand Table", image: "/img/grandtable.jpg"}
    ];

    return (
        <div className="text-center w-full max-w-screen-xl p-8 mx-auto">
            <div className="flex flex-wrap justify-center gap-6">
                {venueList.map((venue) => (
                    <Link key={venue.vid} href={`/venue/${venue.vid}`} passHref>
                        <Card key={venue.vid} vid={venue.vid} venueName={venue.name} imgSrc={venue.image} rating={ratings.get(venue.name) ?? 0} onRatingChange={(newRating) => dispatch({type: "update", venue: venue.name, rating: newRating})} onRemove={() => dispatch({type: "toggle", venue: venue.name})}  />
                    </Link>
                ))}
            </div>
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">สถานที่จัดงาน & Ratings</h2>
                <ul className="list-disc list-inside text-left">
                    {Array.from(ratings.entries()).map(([venue, rating], index) => (
                        <li key={index} data-testid={`${venue}`} onClick={() => dispatch({type: "toggle", venue})} className="text-gray-800 mb-2 cursor-pointer">
                            {venue} - ⭐ {rating}/5
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}