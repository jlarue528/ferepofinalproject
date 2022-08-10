export default class Data {    
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = `https://befinalproject10.herokuapp.com/api` + path;
    
        const options = {
          method,
          headers: {
            'Content-Type': 'application/json; charset=utf-8'
          }
        }
    
        if(body !== null) {
          options.body = JSON.stringify(body);
        }
    
        if(requiresAuth) {
          const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
    
          options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }
   
        return fetch(url, options)
    }

    /*
        * This function handles functionality for getting
        * user data by calling the GET endpoint /users with user provided
        * email and password & user authentication.
    */
    async getUserData(emailAddress, password) {
        const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
        if (response.status === 200) {
            return response.json().then(data => 
                data,
            );
         }
          else if (response.status === 401) {
            return null;
          }
          else {
            console.log(response);
            throw new Error();
          }
      }

    /*
        * This function handles functionality for getting
        * creating a new user calling the POST endpoint /users with 
        * user provided data.
    */
    async createUser(user, emailAddress, password) {
        const response = await this.api('/users', 'POST', user, true, {emailAddress, password});
            if (response.status === 201) {
                return [];
            } else if (response.status === 400) {
                return response.json().then(data => {
                  return data.errors;
                });
            } else if (response.status === 401) {
                return response.json().then(data => {
                  return data.errors;
                })
            } else {
                throw new Error()
        }
    }

    /*
        * This function handles functionality for creating a new course by
        * calling the POST endpoint /courses with provided course data, user
        * authentication, and user credentials.
    */
    async createCourse(course, emailAddress, password) {
        const response = await this.api('/courses', 'POST', course, true, { emailAddress, password});
            if (response.status === 201) {
              return [];
            } else if (response.status === 400) {
                return response.json().then(data => {
                    return data.errors;
                  });
            }   else {
            throw new Error();
        }
    }

    /*
        * This function handles functionality for updating a course by
        * calling the PUT endpoint /courses/:id with provided updated course data, course id,
        * & user authentication.
    */
    async updateCourse(course, id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'PUT', course, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }  else {
            throw new Error();
        }
    }
   
    /*
        * This function handles functionality for deleting a course by
        * calling the DELETE endpoint /courses/:id with provided course id & user
        * authentication.
    */
    async deleteCourse (id, emailAddress, password) {
        const response = await this.api(`/courses/${id}`, 'DELETE', null, true, {emailAddress, password});
        if (response.status === 204) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        }  else {
            throw new Error();
        }
    }
}