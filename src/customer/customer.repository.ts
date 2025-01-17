import { Db, ObjectId } from "mongodb";
import { Customer, CustomerSchema } from "./models/customer.ts";
import { OrderDirection, PaginationDirection } from "../graphql.ts";

export type filter = {
  fieldName: string;
  value: string;
};

export class CustomerRepository {
  private getCursorOperator(
    order: OrderDirection,
    paginationDirection: PaginationDirection,
  ): string {
    if (
      (order === OrderDirection.Asc &&
        paginationDirection === PaginationDirection.Forward) ||
      (order === OrderDirection.Desc &&
        paginationDirection === PaginationDirection.Backward)
    ) {
      return "$gt";
    } else {
      return "$lt";
    }
  }

  private getSortDirection(
    order: OrderDirection,
    paginationDirection: PaginationDirection,
  ): number {
    if (
      (order === OrderDirection.Asc &&
        paginationDirection === PaginationDirection.Forward) ||
      (order === OrderDirection.Desc &&
        paginationDirection === PaginationDirection.Backward)
    ) {
      return 1;
    } else {
      return -1;
    }
  }

  constructor(private db: Db) {}

  async save(customer: Customer): Promise<Customer> {
    const customersCollection = this.db.collection("customers");

    const customerData = {
      organization: customer.organization,
      createDate: customer.createDate,
      properties: customer.properties,
    };

    if (customer.id) {
      // Update existing customer by id
      await customersCollection.updateOne(
        { _id: new ObjectId(customer.id) },
        { $set: customerData },
      );
    } else {
      // Insert new customer
      const result = await customersCollection.insertOne(customerData);
      customer.id = result.insertedId.toString(); // Assign the generated ID to the customer object
    }

    return customer;
  }

  async findCustomerById(id: string): Promise<Customer | null> {
    const result = await this.db.collection("customers").findOne({
      _id: new ObjectId(id),
    });

    if (!result) {
      return null;
    }

    return new Customer(
      CustomerSchema.parse({
        ...result,
        _id: result._id.toString(),
      }),
    );
  }

  async deleteCustomers(ids: string[]): Promise<void> {
    await this.db.collection("customers").deleteMany({
      _id: {
        $in: ids.map((id) => new ObjectId(id)),
      },
    });
  }

  async filterCustomers(options: {
    take: number;
    paginationDirection: PaginationDirection;
    cursor: {
      value: string;
      field: string;
    };
    order: OrderDirection;
    filters: filter[];
    organizationId: string;
  }): Promise<Customer[]> {
    const {
      take,
      cursor,
      order,
      paginationDirection,
      filters,
      organizationId,
    } = options;
    const customers = this.db.collection("customers");

    const cursorOperator = this.getCursorOperator(order, paginationDirection);
    const sortDirection = this.getSortDirection(order, paginationDirection);

    // Build the aggregation pipeline
    const aggregationPipeline = [
      // Match documents using full-text search and organization
      {
        $match: {
          "organization.id": organizationId,
        },
      },
      // Apply additional filters if provided
      ...(filters.length > 0
        ? filters.map((filter) => ({
          $match: {
            [`properties.${filter.fieldName}`]: {
              $regex: filter.value,
              $options: "i", // Case-insensitive search
            },
          },
        }))
        : []),
      // Match documents based on the cursor
      {
        $match: {
          [cursor.field]: {
            [cursorOperator]: cursor.field === "createDate"
              ? new Date(cursor.value)
              : cursor.value,
          },
        },
      },
      // Sort results based on text score and cursor field
      {
        $sort: {
          [cursor.field]: sortDirection,
        },
      },
      // Limit the number of results
      {
        $limit: take,
      },
    ];

    // Execute the aggregation query
    const result = await customers.aggregate(aggregationPipeline).toArray();

    // Map the results to Customer objects
    return result.map((document) => {
      return new Customer(
        CustomerSchema.parse({
          ...document,
          _id: document._id.toString(),
        }),
      );
    });
  }
}
