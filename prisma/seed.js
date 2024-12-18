const {
    PrismaClient,
    Role,
    PaymentStatus,
    TransactionStatus,
} = require('@prisma/client');
const prisma = new PrismaClient();

async function clearData() {
    // Order of deletion matters due to foreign key constraints
    await prisma.transactions.deleteMany();
    await prisma.hotels.deleteMany();
    await prisma.events.deleteMany();
    await prisma.activities.deleteMany();
    await prisma.transportation.deleteMany();
    await prisma.services.deleteMany();
    await prisma.packages.deleteMany();
    await prisma.product.deleteMany();
    await prisma.admin.deleteMany();
    await prisma.customers.deleteMany();
    await prisma.accounts.deleteMany();
}

async function main() {
    // Clear existing data
    console.log('Clearing existing data...');
    await clearData();
    console.log('Data cleared.');

    // Seed accounts
    const account1 = await prisma.accounts.create({
        data: {
            email: 'customer1@example.com',
            password: 'password123',
            role: Role.customer,
            fname: 'John',
            lname: 'Doe',
            gender: 'Male',
            birthdate: new Date('1990-01-01'),
            phone: '1234567890',
            address: '123 Main St, City, Country',
            registration_date: new Date(),
            last_active_date: new Date(),
        },
    });

    const account2 = await prisma.accounts.create({
        data: {
            email: 'admin1@example.com',
            password: 'admin123',
            role: Role.admin,
            fname: 'Jane',
            lname: 'Smith',
            gender: 'Female',
            birthdate: new Date('1985-05-12'),
            phone: '9876543210',
            address: '456 Another St, City, Country',
            registration_date: new Date(),
            last_active_date: new Date(),
        },
    });

    const account3 = await prisma.accounts.create({
        data: {
            email: 'customer2@example.com',
            password: 'password456',
            role: Role.customer,
            fname: 'Alice',
            lname: 'Brown',
            gender: 'Female',
            birthdate: new Date('1992-06-15'),
            phone: '5551234567',
            address: '789 Another Rd, Town, Country',
            registration_date: new Date(),
            last_active_date: new Date(),
        },
    });

    // Seed customers
    const customer1 = await prisma.customers.create({
        data: {
            account_id: account1.account_id,
            ltv: 5000.75,
        },
    });

    const customer2 = await prisma.customers.create({
        data: {
            account_id: account3.account_id,
            ltv: 3000.5,
        },
    });

    // Seed admin
    const admin1 = await prisma.admin.create({
        data: {
            account_id: account2.account_id,
        },
    });

    // Seed products
    const product1 = await prisma.product.create({
        data: {
            product_name: 'Luxury Cruise',
            product_type: 'Travel',
        },
    });

    const product2 = await prisma.product.create({
        data: {
            product_name: 'Mountain Adventure',
            product_type: 'Adventure',
        },
    });

    // Seed packages
    const package1 = await prisma.packages.create({
        data: {
            product_id: product1.product_id,
            highlights: 'All-inclusive luxury experience.',
            what_you_get: 'Ocean-view cabin, fine dining.',
            what_to_expect: 'Relaxing cruise with multiple destinations.',
            best_time_to_visit: 'Winter',
            package_duration: '10 Days',
            faqs: 'What to pack? Are meals included?',
            package_price: 5000.0,
        },
    });

    const package2 = await prisma.packages.create({
        data: {
            product_id: product2.product_id,
            highlights: 'Thrilling mountain climbing experience.',
            what_you_get: 'Gear and guided tours.',
            what_to_expect: 'Challenging yet rewarding adventure.',
            best_time_to_visit: 'Spring',
            package_duration: '5 Days',
            faqs: 'Is prior experience required? What is the difficulty level?',
            package_price: 1200.0,
        },
    });

    // Seed services
    const service1 = await prisma.services.create({
        data: {
            product_id: product1.product_id,
            service_type: 'Transportation',
            service_price: 300.0,
        },
    });

    const service2 = await prisma.services.create({
        data: {
            product_id: product2.product_id,
            service_type: 'Guided Tour',
            service_price: 200.0,
        },
    });

    // Seed transportation
    await prisma.transportation.create({
        data: {
            service_id: service1.service_id,
            vehicle_type: 'Shuttle Bus',
            vehicle_info: 'Comfortable seating for 20.',
            capacity: 20,
            schedule: 'Twice daily at 9:00 AM and 3:00 PM.',
            vehicle_price: 50.0,
        },
    });

    // Seed activities
    await prisma.activities.create({
        data: {
            service_id: service2.service_id,
            highlights: 'Scenic hikes with breathtaking views.',
            what_you_get: 'Professional guide and snacks.',
            what_to_expect: 'Moderate difficulty, suitable for most.',
            best_time_to_visit: 'Morning',
            activity_date: new Date('2024-04-15'),
            activity_duration: '3 Hours',
            faqs: 'What should I wear? Are children allowed?',
            activity_price: 80.0,
        },
    });

    // Seed events
    await prisma.events.create({
        data: {
            service_id: service2.service_id,
            highlights: 'Local music and dance performance.',
            location: 'Mountain Base Camp',
            what_you_get: 'Reserved seating and refreshments.',
            what_to_expect: 'Cultural immersion and entertainment.',
            best_time_to_visit: 'Evening',
            event_date: new Date('2024-05-10'),
            event_duration: '2 Hours',
            faqs: 'Is photography allowed? Are there age restrictions?',
            event_price: 40.0,
        },
    });

    // Seed hotels
    await prisma.hotels.create({
        data: {
            service_id: service1.service_id,
            hotel_name: 'Cruise Ship Suites',
            room_type: 'Luxury Suite',
            what_you_get: 'Private balcony, king-size bed.',
            what_to_expect: 'Comfortable stay with stunning ocean views.',
            amenities: 'Spa, Pool, Free Wi-Fi.',
            highlights: 'Exclusive access to VIP areas.',
            duration: '7 Nights',
            faqs: 'Are pets allowed? Is room service available?',
            hotel_price: 1000.0,
        },
    });

    // Seed transactions
    await prisma.transactions.create({
        data: {
            customer_id: customer1.customer_id,
            product_id: product1.product_id,
            transaction_date: new Date('2024-03-01'),
            total_Amount: 5300.0,
            payment_status: PaymentStatus.paid,
            transaction_status: TransactionStatus.completed,
        },
    });

    await prisma.transactions.create({
        data: {
            customer_id: customer2.customer_id,
            product_id: product2.product_id,
            transaction_date: new Date('2024-03-05'),
            total_Amount: 1400.0,
            payment_status: PaymentStatus.pending,
            transaction_status: TransactionStatus.pending,
        },
    });

    console.log('Seed data created successfully');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
