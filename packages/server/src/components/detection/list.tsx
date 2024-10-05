'use client'

import {formatDate} from "@/lib/utils";

export default function List({ detections }) {
    return (
        <div className="space-y-3 items-center">
            <h1 className="text-2xl font-bold">Detections</h1>
            <div className="grid grid-cols-1 gap-4">
                {detections && detections.map((detection) => (
                    <div key={detection.id} className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-bold">{detection.detectedObject}</h2>
                        <p>{detection.confidence}</p>
                        <p className="text-sm text-gray-500">Created at: {formatDate(detection.timestamp)}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
