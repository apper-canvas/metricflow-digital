import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import Badge from '@/components/atoms/Badge';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import ApperIcon from '@/components/ApperIcon';
import { userService } from '@/services/api/userService';

const SettingsForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    preferences: {
      emailNotifications: true,
      pushNotifications: true,
      weeklyReports: true,
      darkMode: false,
    }
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await userService.getById(1); // Current user
      setUser(data);
      setFormData({
        name: data.name,
        email: data.email,
        role: data.role,
        preferences: data.preferences
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (preference) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [preference]: !prev.preferences[preference]
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const updatedUser = await userService.update(1, formData);
      setUser(updatedUser);
      toast.success('Settings updated successfully');
    } catch (err) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading type="form" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadUser} />;
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            
            <FormField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Role:</span>
            <Badge variant="primary">{formData.role}</Badge>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="flex items-center space-x-2"
            >
              {saving ? (
                <>
                  <ApperIcon name="Loader2" className="h-4 w-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <ApperIcon name="Save" className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Preferences</h3>
        
        <div className="space-y-4">
          {Object.entries(formData.preferences).map(([key, value]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <h4 className="font-medium text-gray-900 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h4>
                <p className="text-sm text-gray-600">
                  {key === 'emailNotifications' && 'Receive email notifications for important updates'}
                  {key === 'pushNotifications' && 'Get push notifications on your device'}
                  {key === 'weeklyReports' && 'Receive weekly summary reports'}
                  {key === 'darkMode' && 'Use dark theme for the interface'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handlePreferenceChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  value ? 'bg-primary' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default SettingsForm;