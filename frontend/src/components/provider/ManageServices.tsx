import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Edit, Trash, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user?._id) {
      fetchServices();
    }
  }, [user]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/services/provider/${user._id}`);
      if (res.ok) {
        const data = await res.json();
        setServices(data);
      }
    } catch (err) {
      console.error('Failed to fetch services', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setServices(services.filter((s) => s._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete service', err);
    }
  };

  if (loading) {
    return <div className="text-white text-center p-12">Loading services...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Manage Services</h1>
        <p className="text-blue-200/70">View, edit, and remove your active services.</p>
      </header>
      
      {services.length === 0 ? (
        <div className="text-center p-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
          <p className="text-blue-200/50">You have not added any services yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden flex flex-col"
            >
              <div className="h-48 bg-slate-800 relative">
                {service.images && service.images.length > 0 ? (
                  <img src={`http://localhost:5000${service.images[0]}`} alt={service.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-slate-600" />
                  </div>
                )}
                <div className="absolute top-3 right-3 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {service.category}
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                <p className="text-sm text-slate-300 line-clamp-2 mb-4 flex-grow">{service.description}</p>
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-xl font-bold text-blue-400">₹{service.price}</span>
                  <div className="flex gap-2">
                    <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(service._id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 rounded-lg transition-colors text-red-500">
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
