import React from 'react'

function extrasection() {
  return (
    <div>
            <section className="bg-blue-950 max-w-screen-xl text-white py-16 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Featured Hobby Groups</h2>
                        <p className="text-lg text-gray-300 mb-12">Explore some of the most active and exciting groups in our community.</p>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="bg-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <img src="https://i.ibb.co/v4RQPwKy/image-2025-05-23-234147633.png" className="rounded-lg object-cover w-full h-48 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Art Enthusiasts</h3>
                            <p className="text-sm text-gray-300">Join fellow artists to create, critique, and collaborate on new projects.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <img src="https://i.ibb.co/gbSfZTYr/image-2025-05-23-225927468.png" className="rounded-lg object-cover w-full h-48 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Gaming Legends</h3>
                            <p className="text-sm text-gray-300">Weekly gaming tournaments and strategy discussions for all skill levels.</p>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <img src="https://i.ibb.co/rRZ7VLwM/image-2025-05-23-225815032.png" className="rounded-lg object-cover w-full h-48 mb-4" />
                            <h3 className="text-xl font-semibold mb-2">Photo Explorers</h3>
                            <p className="text-sm text-gray-300">Capture the world around you and share your best shots with like-minded explorers.</p>
                        </div>
                        </div>
                    </div>
            </section>


            <section className="bg-gradient-to-br from-blue-900 to-black text-white py-20 px-4">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-6">Why Join Our Hobby Community?</h2>
                    <p className="text-lg text-gray-300 mb-12">We're more than just a platform — we're a movement of creators, thinkers, and doers.</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                    <div className="bg-white/10 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Connect with Passion</h3>
                        <p className="text-sm text-gray-300">Meet people who share your interests and grow together through collaboration.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Learn & Share</h3>
                        <p className="text-sm text-gray-300">Access workshops, group activities, and feedback from experienced hobbyists.</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-semibold mb-2">Host Your Own Group</h3>
                        <p className="text-sm text-gray-300">Easily create and manage your own hobby group with powerful admin tools.</p>
                    </div>
                    </div>
                </div>
         </section>
    </div>
  )
}

export default extrasection