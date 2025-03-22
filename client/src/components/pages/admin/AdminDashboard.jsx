import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Charts from './components/Charts';
import MetricsCard from "./components/MetricsCard";
import TemplateManagement from "./components/TemplateManagement";
import CreateTemplateModal from './components/CreateTemplateModal';
import EditTemplateModal from './components/EditTemplateModal'
import apiConfig from "../../../api/apiConfig";


ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);




const AdminDashboard = () => {
  const [createLoading, setCreateLoading] = useState(false);
  const [metrics, setMetrics] = useState({
    users: 7,
    templates: 0,
    averageRating: 0,
    resumesDownloaded: 100,
  });
  const [editTemplateData, setEditTemplateData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [monthlyDownloads, setMonthlyDownloads] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    layout: "",
    isCustomizable: false,
    categories: [],

  });
  

  const templates = useSelector((state) => state.template.templates || []);
  const dispatch = useDispatch();

  useEffect(() => {
    setMetrics((prev) => ({ ...prev, templates: templates.length }));
  }, [templates]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {

        const response = await axios.get(apiConfig.templates.getAll);
        dispatch({ type: "FETCH_TEMPLATES_SUCCESS", payload: response.data.templates });
      } catch (err) {
        dispatch({ type: "FETCH_TEMPLATES_FAILURE", payload: err.message });
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchNoOfResumeDownloads = async () => {
      try {
        const response = await axios.get(apiConfig.downloads.count,
          { 
            withCredentials:true,
          });

        setMetrics((prev) => ({
          ...prev,
          resumesDownloaded: response.data.totalDownloads,
        }));
      } catch (err) {
        console.error("Error fetching resume downloads:", err);
      }
    };
    fetchNoOfResumeDownloads();
  }, []);

  useEffect(() => {
    const fetchMonthlyDownloads = async () => {
      const months = Array.from({ length: 12 }, (_, i) => {
        const today = new Date();
        const date = new Date(today.getFullYear(), today.getMonth() - i, 7); // Always set the date to the 7th
    
        return {
          month: date.toISOString().slice(0, 7),
          label: date.toLocaleString("default", { month: "short", year: "numeric" }),
        };
      }).reverse();
  
      try {
        const monthlyData = await Promise.all(
          months.map(async ({ month }) => {
            const response = await axios.get(apiConfig.downloads.monthly(month), {
              withCredentials: true,
            });
  
            return response.data.downloads || 0;
          })
        );
  
        setMonthlyDownloads(
          months.map((month, index) => ({
            label: month.label,
            count: monthlyData[index],
          }))
        );
      } catch (err) {
        console.error("Error fetching monthly downloads:", err);
      }
    };
  
    fetchMonthlyDownloads();
  }, []);
  

  useEffect(() => {
    const fetchNoOfUsers = async () => {
      try {
        const response = await axios.get(apiConfig.users.count,{
          withCredentials:true,
        });
        setMetrics((prev) => ({ ...prev, users: response.data.userCount }));
      } catch (err) {
        console.error("Error fetching user count:", err);
      }
    };
    fetchNoOfUsers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));
    
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("layout", formData.layout);
    form.append("isCustomizable", formData.isCustomizable);
    form.append("thumbnail", formData.thumbnail); // Only if updating the thumbnail
    
    // Handle categories array
    formData.categories.forEach((category) => {
      form.append("categories[]", category);
    });
    

    try {
      setCreateLoading(true);

      await axios.post(apiConfig.templates.create, form, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
     
      toast.success("Template created successfully!");
      setShowModal(false); // Close the modal on success
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error("Failed to create template.");
    } finally {
      setCreateLoading(false);
    }
  };

  const templateDownloadData = {
    labels: templates.map((template) => template.name),
    datasets: [
      {
        data: templates.map((template) => template.downloads),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  const monthlyDownloadData = {
    labels: monthlyDownloads.map((data) => data.label),
    datasets: [
      {
        label: "Downloads",
        data: monthlyDownloads.map((data) => data.count),
        backgroundColor: "#36A2EB",
      },
    ],
  };
// here we have work to do
const handleEditInputChange = (e) => {
  const { name, value } = e.target;

    setEditTemplateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
};

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
form.append("name", editTemplateData.name);
form.append("description", editTemplateData.description);
form.append("layout", editTemplateData.layout);
form.append("isCustomizable", editTemplateData.isCustomizable);
form.append("thumbnail", editTemplateData.thumbnail); // Only if updating the thumbnail

// Handle categories array
editTemplateData.categories.forEach((category) => {
  form.append("categories[]", category);
});


    try {
      setCreateLoading(true);


    await axios.put(apiConfig.templates.update(editTemplateData._id), form, {
      withCredentials: true,
    });

      toast.success("Template updated successfully!");
      setIsEditing(false); // Close modal after successful update
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template.");
    } finally {
      setCreateLoading(false);
    }
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  const handleDelete = (templateId) => {
    setTemplateToDelete(templateId);
    setShowDeleteModal(true);
  };

  const handleRestore = async (templateId) => {
    try {
      // Start loading state 
  
      // Make the API call to restore the template
      await axios.put(apiConfig.templates.restore(templateId), {}, {
        withCredentials: true, 
      });
  
      // Show success toast notification
      toast.success("Template restored successfully!");
      
      // Optionally, trigger any state updates here (e.g., refetch templates or close modal)
    } catch (error) {
      console.error("Error restoring template:", error);
      
      // Show error toast notification
      toast.error("Failed to restore template.");
    } 
  };


  const DeleteConfirmationModal = ({ onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-xl font-semibold mb-4">Are you sure you want to delete this template?</h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Yes, delete
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const confirmDelete = async () => {
    try {


      await axios.delete(apiConfig.templates.delete(templateToDelete), {
        withCredentials: true,
      });


      toast.success("Template deleted successfully");
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Error deleting template");
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  useEffect(() => {
    const fetchAverageRating = async () => {
      try {

const response = await axios.get(apiConfig.feedback.getAverage,
  {
    withCredentials:true,
  }
);
        setMetrics((prev) => ({
          ...prev,
          averageRating: response.data.averageRating,
        }));
      } catch (err) {
        console.error("Error fetching average rating:", err);
      }
    };
    fetchAverageRating();
  }, []);

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MetricsCard title="Total Users" value={metrics.users} color="text-blue-500" />
        <MetricsCard title="Total Templates" value={metrics.templates} color="text-green-500" />
        <MetricsCard title="Resumes Downloaded" value={metrics.resumesDownloaded} color="text-purple-500" />
        <MetricsCard title="Average Rating" value={metrics.averageRating || "N/A"} color="text-yellow-500" />
      </div>

      <Charts
        templateDownloadData={templateDownloadData}
        monthlyDownloadData={monthlyDownloadData}
      />

      <TemplateManagement
        templates={templates}
        handleDelete={handleDelete}
        handleRestore={handleRestore}
        setShowModal={setShowModal}
        setEditTemplateData={setEditTemplateData}
        setIsEditing={setIsEditing}
        expandedDescription={expandedDescription}
        setExpandedDescription={setExpandedDescription}
      />

      {showModal && (
        <CreateTemplateModal
          formData={formData}
          onClose={() => setShowModal(false)}
          onInputChange={handleInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleSubmit}
          isLoading={createLoading}
        />
      )}

      {isEditing && (
        <EditTemplateModal
          formData={editTemplateData}
          onClose={() => setIsEditing(false)}
          onInputChange={handleEditInputChange}
          onFileChange={handleFileChange}
          onSubmit={handleEditSubmit}
          isLoading={createLoading}
        />
      )}

      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
