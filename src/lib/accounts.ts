import { prisma } from './prisma';
import bcrypt from 'bcryptjs';
import { Role } from '@prisma/client';

// POST: Create account/sign up
export async function createAccount(data: {
  email: string;
  password: string;
  role: Role;
  fname: string;
  lname: string;
  gender: string;
  birthdate: Date;
  phone: string;
  address: string;
  imagelink?: string;
}) {
  try {
    const { email, password, role, fname, lname, gender, birthdate, phone, address, imagelink } = data;

    if (await prisma.accounts.findUnique({ where: { email } })) {
      return { error: 'Email already in use' };
    }
    if (await prisma.accounts.findUnique({ where: { phone } })) {
      return { error: 'Phone number already in use' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const account = await prisma.accounts.create({
      data: {
        email,
        password: hashedPassword,
        role,
        fname,
        lname,
        gender,
        birthdate,
        phone,
        address,
        imagelink,
        last_active_date: new Date(),
      },
    });

    if (role === 'customer') {
      await prisma.customers.create({
        data: {
          account_id: account.account_id,
          ltv: 0,
        },
      });
    } else if (role === 'admin') {
      await prisma.admin.create({
        data: {
          account_id: account.account_id,
        },
      });
    }

    return { account };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get all accounts
export async function getAllAccounts() {
  try {
    const accounts = await prisma.accounts.findMany({
      where: { is_active: true }, 
      select: {
        account_id: true,
        email: true,
        fname: true,
        lname: true,
        gender: true,
        birthdate: true,
        phone: true,
        address: true,
        registration_date: true,
        last_active_date: true,
        imagelink: true,
        Customers: true,
        Admin: true,
      },
    });

    return { accounts };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// GET: Get specific account (log in)
export async function getAccount(email: string, password: string) {
  try {
    const account = await prisma.accounts.findUnique({
      where: { email },
    });

    if (!account || !(await bcrypt.compare(password, account.password))) {
      return { error: 'Invalid email or password' };
    }

    if (!account.is_active) {
      return { error: 'Account is deactivated' };
    }

    // Update last_active_date on successful login
    await prisma.accounts.update({
      where: { account_id: account.account_id },
      data: { last_active_date: new Date() },
    });

    return { account };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// UPDATE: Update account details
export async function updateAccount(
  accountId: number,
  data: {
    fname?: string;
    lname?: string;
    gender?: string;
    birthdate?: Date;
    phone?: string;
    address?: string;
    imagelink?: string;
  }
) {
  try {
    if (data.phone && await prisma.accounts.findUnique({ where: { phone: data.phone } })) {
      return { error: 'Phone number already in use' };
    }
    if (data.birthdate && data.birthdate >= new Date()) {
      return { error: 'Birthdate must be a past date' };
    }

    const updatedAccount = await prisma.accounts.update({
      where: { account_id: accountId },
      data,
    });

    return { updatedAccount };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}

// DELETE: Soft delete account
export async function deleteAccount(accountId: number) {
  try {
    const account = await prisma.accounts.update({
      where: { account_id: accountId },
      data: { is_active: false },
    });

    return { message: 'Account deactivated successfully', account };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: 'An unknown error occurred' };
  }
}
