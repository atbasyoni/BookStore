import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading = true; // Track data loading state
  error: string | null = null; // Store any error message
  selectedUser: User | null = null; // For user details

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers()
      .subscribe({
        next: (users) => {
          this.users = users;
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message || 'An error occurred while fetching users.';
          this.loading = false;
        },
      });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  // Add methods for user management based on your requirements:
  updateUser(user: User) {
    this.userService.updateUser(user)
      .subscribe({
        next: (updatedUser) => {
          // Update the user details in the UI
          const index = this.users.findIndex((u) => u.id === updatedUser.id);
          if (index !== -1) {
            this.users[index] = updatedUser;
          }
          // Optionally clear selected user after update
          this.selectedUser = null;
        },
        error: (error) => {
          // Handle error and display message to admin
          this.error = error.message || 'An error occurred while updating the user.';
        },
      });
  }

  deleteUser(userId: number) {
    this.userService.deleteUser(userId)
      .subscribe({
        next: () => {
          // Remove the deleted user from the UI
          const index = this.users.findIndex((u) => u.id === userId.toString());
          if (index !== -1) {
            this.users.splice(index, 1);
          }
          // Optionally display confirmation message
        },
        error: (error) => {
          // Handle error and display message to admin
          this.error = error.message || 'An error occurred while deleting the user.';
        },
      });
  }

  // Additional methods (e.g., search, filter, user roles management) as needed
}
