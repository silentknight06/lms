const AdminUser = require('./models/adminUser')
const User = require('./models/user')
 const seedAdminUsers = async () => {
    try {
      // Create the test user
      const testUser = new AdminUser({
        username: 'admin',
        name: 'Test User',
        password: '111111',
        email: 'test1@gmail.com',
        contactNumber: '1234567890',
        createdBy: 'test@gmail.com',
      });
  
      // Save the test user
      await testUser.save();
  
      console.log('Admin user seeded successfully!');
    //   mongoose.disconnect();
    } catch (error) {
      console.error('Error seeding admin user:', error);
    //   mongoose.disconnect();
    }
  };


  const seedUsers = async () => {
    try {
      // Create the test user
      const testUser = new User({
        username: 'test',
        name: 'Test User',
        email: 'test@gmail.com',
        contactNumber: '1234567890',
        createdBy: 'test@gmail.com',
      });
  
      // Save the test user
      await testUser.save();
  
      console.log('Admin user seeded successfully!');
    //   mongoose.disconnect();
    } catch (error) {
      console.error('Error seeding admin user:', error);
    //   mongoose.disconnect();
    }
  };
  module.exports={seedAdminUsers, seedUsers}
