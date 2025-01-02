const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Seed Accounts
    const account1 = await prisma.accounts.create({
        data: {
            email: 'john.doe@example.com',
            password: 'hashedpassword1',
            role: 'customer',
            firstname: 'John',
            lastname: 'Doe',
            gender: 'Male',
            birthdate: new Date('1990-01-01'),
            phone: '1234567890',
            address: '123 Example Street',
            last_active_date: new Date(),
            imagelink: 'http://example.com/johndoe.jpg',
        },
    });

    const account2 = await prisma.accounts.create({
        data: {
            email: 'admin@example.com',
            password: 'hashedpassword2',
            role: 'admin',
            firstname: 'Jane',
            lastname: 'Smith',
            gender: 'Female',
            birthdate: new Date('1985-05-15'),
            phone: '0987654321',
            address: '456 Example Avenue',
            last_active_date: new Date(),
            imagelink: 'http://example.com/janesmith.jpg',
        },
    });

    // Seed Customers
    const customer1 = await prisma.customers.create({
        data: {
            account_id: account1.account_id,
            ltv: 500.0,
        },
    });

    // Seed Admin
    const admin1 = await prisma.admin.create({
        data: {
            account_id: account2.account_id,
        },
    });

    // Seed Product
    const product1 = await prisma.product.create({
        data: {
            product_name: 'Product A',
            product_type: 'Type 1',
        },
    });

    // Seed Packages
    const package1 = await prisma.packages.create({
        data: {
            product_id: product1.product_id,
            highlights: 'Best experience!',
            what_you_get: 'Exclusive package',
            what_to_expect: 'Luxury and comfort',
            best_time_to_visit: 'December',
            package_duration: '5 days',
            faqs: 'None',
            package_price: 1200.0,
        },
    });

    // Seed Services
    const service1 = await prisma.services.create({
        data: {
            product_id: product1.product_id,
            service_type: 'Transportation',
            service_price: 300.0,
        },
    });

    // Seed Transportation
    const transportation1 = await prisma.transportation.create({
        data: {
            service_id: service1.service_id,
            vehicle_type: 'Car',
            vehicle_info: 'Sedan',
            capacity: 4,
            schedule: 'Daily',
            vehicle_price: 100.0,
        },
    });

    // Seed Transactions
    const transaction1 = await prisma.transactions.create({
        data: {
            customer_id: customer1.customer_id,
            product_id: product1.product_id,
            transaction_date: new Date(),
            total_Amount: 1500.0,
            payment_status: 'paid',
            transaction_status: 'completed',
        },
    });

    // Seed Activities
    const activity1 = await prisma.activities.create({
        data: {
            service_id: service1.service_id,
            highlights: 'Adventure activity',
            what_you_get: 'Thrills and excitement',
            what_to_expect: 'Memorable experience',
            best_time_to_visit: 'Summer',
            activity_date: new Date('2024-06-01'),
            activity_duration: '3 hours',
            faqs: 'None',
            activity_price: 50.0,
        },
    });

    // Seed Events
    const event1 = await prisma.events.create({
        data: {
            service_id: service1.service_id,
            highlights: 'Cultural festival',
            location: 'Downtown',
            what_you_get: 'Cultural immersion',
            what_to_expect: 'Fun and learning',
            best_time_to_visit: 'Spring',
            event_date: new Date('2024-04-01'),
            event_duration: '1 day',
            faqs: 'None',
            event_price: 75.0,
        },
    });

    // Seed Hotels
    const hotel1 = await prisma.hotels.create({
        data: {
            service_id: service1.service_id,
            hotel_name: 'Luxury Inn',
            room_type: 'Suite',
            what_you_get: 'Comfortable stay',
            what_to_expect: 'Top-notch service',
            amenities: 'Pool, Spa, Gym',
            highlights: 'Great location',
            duration: '2 nights',
            faqs: 'None',
            hotel_price: 500.0,
        },
    });

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
