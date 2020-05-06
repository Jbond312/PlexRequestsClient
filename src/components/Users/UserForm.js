import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../common/TextInput'

const UserForm = ({ user, onChange, onSave, errors = {} }) => {
    return (<>
        <h2>User Form - {user.id}</h2>
        <form className="form" onSubmit={onSave}>
            <TextInput
                name="username"
                label="Username"
                placeholder="Please enter a username..."
                value={user.username}
                onChange={onChange}
                error={errors.username}
                disabled={true}
            />
        </form>
    </>)
}

UserForm.propTypes = {
    user: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    errors: PropTypes.object
}

export default UserForm