import { Db, ObjectId } from "mongodb";
import { Customer, CustomerSchema } from "./models/customer";
import { PaginationDirection, OrderDirection } from "../graphql";

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

   async filterCustomers(options: {
      filters: filter[];
      take: number;
      paginationDirection: PaginationDirection;
      cursor: {
         value: any;
         field: string;
      };
      order: OrderDirection;
      organizationId: string;
   }): Promise<Customer[]> {
      const {
         filters,
         take,
         cursor,
         order,
         organizationId,
         paginationDirection,
      } = options;
      const customers = this.db.collection("customers");

      const aggregationPipeline = [
         // Match documents based on organization ID
         {
            $match: {
               "organization.id": organizationId,
            },
         },
         // Match documents based on the cursor
         {
            $match: {
               [cursor.field]: {
                  [this.getCursorOperator(order, paginationDirection)]:
                     cursor.field === "createDate"
                        ? new Date(cursor.value)
                        : cursor.value,
               },
            },
         },
         // Apply filters
         ...(filters.length > 0
            ? filters.map((filter) => ({
                 $match: {
                    [`properties.${filter.fieldName}`]: {
                       $regex: filter.value,
                       $options: "i",
                    },
                 },
              }))
            : []),
         // Sort the results
         {
            $sort: {
               [cursor.field]: this.getSortDirection(
                  order,
                  paginationDirection,
               ),
            },
         },
         // Limit the number of results
         {
            $limit: take,
         },
      ];

      const result = await customers.aggregate(aggregationPipeline).toArray();

      return result.map((document) => {
         return new Customer(
            CustomerSchema.parse({ ...document, _id: document._id.toString() }),
         );
      });
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
}
