import { compose } from 'recompose';
import { graphql } from 'react-apollo';

import { NoteTitleQuery } from './queries';
import { addNoteTitle } from './mutations';
import { deleteNoteTitle } from './mutations';
import { updateNoteTitle } from './mutations';

const withGraphqlQuery = graphql(NoteTitleQuery, {
    options: ({serchName = ''}) => ({
        variables: {serchName}
    })
})

const withGraphqlAdd = graphql(addNoteTitle, {
    props: ({mutate}) => ({
        addNoteTitle: newNoteTitle => mutate({
            variables: newNoteTitle,
            refetchQueries: [{query : NoteTitleQuery, variables: {serchName: ''}}]
        })
    })
})

const withGraphqlDelet = graphql(deleteNoteTitle, {
    props: ({mutate}) => ({
        deleteNoteTitle: id => mutate({
            variables: id,
            refetchQueries: [{query : NoteTitleQuery, variables: {serchName: ''}}]
        })
    })
})

const withGraphqlUpdate = graphql(updateNoteTitle, {
    props: ({mutate}) => ({
        renameNoteTitle: renameNoteTitle => mutate({
            variables: renameNoteTitle,
            refetchQueries: [{query : NoteTitleQuery, variables: {serchName: ''}}]
        })
    })
})



export default compose(withGraphqlQuery,withGraphqlAdd,withGraphqlDelet,withGraphqlUpdate);
