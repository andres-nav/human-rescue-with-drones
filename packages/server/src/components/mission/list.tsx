'use client'

export default function List({ missions }) {
    return (
        <div className="space-y-3 items-center">
            <h1 className="text-2xl font-bold">Missions</h1>
            <div className="grid grid-cols-1 gap-4">
                {missions && missions.map((mission) => (
                    <div key={mission.id} className="bg-white shadow-md rounded-md p-4">
                        <h2 className="text-xl font-bold">{mission.name}</h2>
                        <p>{mission.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
